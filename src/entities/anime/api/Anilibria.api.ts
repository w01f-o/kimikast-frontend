import {
  Anime,
  Filters,
  GetAnimeParams,
  GetAnimeUpdatesParams,
  GetTitlesListParams,
  SearchAnimeParams,
  SearchResult,
} from '@/entities/anime';
import { serialize } from '@/shared/lib';
import axios, { AxiosInstance } from 'axios';
import { plainToInstance } from 'class-transformer';

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

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const transformedKey = key.replace(
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
      transformedParams.playlist_type = 'object';
    }

    return transformedParams;
  }

  public static async getAnime(
    params: GetAnimeParams,
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
    params: GetAnimeUpdatesParams,
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
