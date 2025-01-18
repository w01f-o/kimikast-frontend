'use client';

import { useSearchAnime } from '@/entities/anime';
import { RoutePaths } from '@/shared/router';
import { AnimeListLoader, Col, Container, PageHeading, Row } from '@/shared/ui';
import { AnimeList } from '@/widgets/anime';
import { SearchFilter } from '@/widgets/search';
import { Input } from '@heroui/input';
import { Pagination } from '@heroui/pagination';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { ChangeEvent, FC } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

interface SearchTitleProps {
  query?: string;
  years?: string;
  genres?: string;
  page?: string;
}

export const SearchPage: FC<SearchTitleProps> = ({
  query,
  years,
  genres,
  page,
}) => {
  const { result, isLoading, isSuccess, pageCount, emptyResult } =
    useSearchAnime({ genres, page, years, query });

  const changePageHandler = (page: number) => {
    console.log(page);
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  const changeQueryHandler = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;

      const params = new URLSearchParams(searchParams);

      if (searchParams.has('query') && !value.length) {
        params.delete('query');
      } else {
        params.set('query', value.trim());
      }

      router.push(`${RoutePaths.SEARCH}?${params}`);
    },
    300
  );

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Поиск</PageHeading>
        </Col>
        <Col xs={6} className="flex gap-4">
          <Input
            size="lg"
            placeholder="Название"
            defaultValue={query ?? ''}
            onChange={changeQueryHandler}
          />
          <SearchFilter />
        </Col>
        <Col xs={12}>
          <Row className="pt-6">
            {query || genres || years ? (
              <>
                {isSuccess && (
                  <>
                    <AnimeList list={result!.list} />
                    {!!pageCount && pageCount > 1 && (
                      <Col xs={12} className="mb-6 flex justify-center">
                        <Pagination
                          total={pageCount}
                          initialPage={1}
                          size={'lg'}
                          showControls
                          page={page ? Number(page) : 1}
                          onChange={changePageHandler}
                        />
                      </Col>
                    )}
                  </>
                )}
                {isLoading && <AnimeListLoader length={18} />}
              </>
            ) : (
              <Col xs={12}>
                <div className="pt-2 text-xl">Введите запрос</div>
              </Col>
            )}
            {emptyResult && (
              <Col xs={12}>
                <div className="pt-2 text-xl">Ничего не найдено</div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
