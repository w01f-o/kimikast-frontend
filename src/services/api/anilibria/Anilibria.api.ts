import axios, { AxiosInstance } from 'axios';
import { plainToInstance } from 'class-transformer';
import { Anime } from '@/types/anilibria/entities/Anime.type';
import { serialize } from '@/services/utils/serialize';
import { SearchResult } from '@/types/anilibria/SearchResult.type';
import { Filters } from '@/types/anilibria/entities/Filters.type';
import { GetTitleParams } from '@/types/anilibria/GetAnimeParams.type';
import { GetTitlesListParams } from '@/types/anilibria/GetAnimeListParams.type';
import { GetTitleUpdatesParams } from '@/types/GetTitlesParams.type';
import { SearchAnimeParams } from '@/types/anilibria/SearchAnime.Params';

export class AnilibriaApi {
  public static readonly IMAGE_URL: string = 'https://dl-20241107-5.anilib.moe';
  private static readonly TITLE_ENDPOINT: string = 'title';

  private static readonly axios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ANILIBRIA_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  private static transformParams<T>(params: T) {
    const transformedParams: Record<string, unknown> = {};

    for (const paramsKey in params) {
      if (Object.prototype.hasOwnProperty.call(params, paramsKey)) {
        const key = paramsKey as keyof T;
        const transformedKey = String(key).replace(
          /[A-Z]/g,
          letter => `_${letter.toLowerCase()}`
        );

        if (Array.isArray(params[key])) {
          transformedParams[transformedKey] = params[key].join(',');
        } else {
          transformedParams[transformedKey] = params[key];
        }
      }
    }

    if (!('playlist_type' in transformedParams)) {
      transformedParams.playlist_type = 'array';
    }

    return transformedParams;
  }

  public static async getAnime(
    params: GetTitleParams,
    signal?: AbortSignal
  ): Promise<Anime> {
    const { data } = await this.axios.get<Anime>(`/${this.TITLE_ENDPOINT}`, {
      params: this.transformParams(params),
      signal,
    });

    return serialize(
      plainToInstance(Anime, data, { excludeExtraneousValues: true })
    );
  }

  public static async getAnimeList(
    params: GetTitlesListParams,
    signal?: AbortSignal
  ): Promise<Anime[]> {
    const { data } = await this.axios.get<Anime[]>(
      `/${this.TITLE_ENDPOINT}/list`,
      {
        params: this.transformParams(params),
        signal,
      }
    );

    return serialize(
      plainToInstance(Anime, data, { excludeExtraneousValues: true })
    );
  }

  public static async getAnimeUpdates(
    params: GetTitleUpdatesParams,
    signal?: AbortSignal
  ) {
    const { data } = await this.axios.get<SearchResult>(
      `/${this.TITLE_ENDPOINT}/updates`,
      {
        params: this.transformParams(params),
        signal,
      }
    );

    return serialize(
      plainToInstance(SearchResult, data, { excludeExtraneousValues: true })
    );
  }

  public static async searchAnime(
    params: SearchAnimeParams,
    signal?: AbortSignal
  ): Promise<SearchResult> {
    const { data } = await this.axios.get<SearchResult>(
      `/${this.TITLE_ENDPOINT}/search`,
      {
        params: this.transformParams(params),
        signal,
      }
    );

    return serialize(
      plainToInstance(SearchResult, data, { excludeExtraneousValues: true })
    );
  }

  public static async getAnimeFilters(signal?: AbortSignal): Promise<Filters> {
    const [{ data: years }, { data: genres }] = await Promise.all([
      this.axios.get('/years', { signal }),
      this.axios.get('/genres', { signal }),
    ]);

    return serialize(
      plainToInstance(
        Filters,
        { genres, years },
        { excludeExtraneousValues: true }
      )
    );
  }
}
