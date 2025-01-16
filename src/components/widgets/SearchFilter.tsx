'use client';

import { FC, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Filter, FilterX } from 'lucide-react';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useQuery } from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { CheckboxGroup } from '@nextui-org/checkbox';
import { CustomCheckbox } from '@/components/shared/UI/CustomCheckbox';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { Spinner } from '@nextui-org/spinner';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';

const SearchFilter: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [AnilibriaQueryKeys.FILTERS],
    queryFn: AnilibriaApi.getTitleFilters,
  });

  const [yearsSelected, setYearsSelected] = useState<string[]>(
    searchParams.get('years')?.split(',') || []
  );
  const [genresSelected, setGenresSelected] = useState<string[]>(
    searchParams.get('genres')?.split(',') || []
  );

  const resetClickHandler = () => {
    setYearsSelected([]);
    setGenresSelected([]);
  };

  const filterIsSelected = yearsSelected.length || genresSelected.length;

  const applyClickHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (yearsSelected.length) {
      newSearchParams.set('years', yearsSelected.join(','));
    } else {
      newSearchParams.delete('years');
    }

    if (genresSelected.length) {
      newSearchParams.set('genres', genresSelected.join(','));
    } else {
      newSearchParams.delete('genres');
    }

    router.push(`${RoutePaths.SEARCH}?${newSearchParams}`);
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        endContent={<Filter />}
        size="lg"
        color={
          searchParams.get('genres') || searchParams.get('years')
            ? 'primary'
            : 'default'
        }
        onClick={onOpen}
      />
      <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} size={'5xl'}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="mt-4 text-4xl">Фильтры</ModalHeader>
              <ModalBody>
                {isLoading && <Spinner />}
                {isSuccess && (
                  <>
                    <div>
                      <h4 className="mb-3 text-xl font-bold">Жанры</h4>
                      <CheckboxGroup
                        orientation="horizontal"
                        onChange={setGenresSelected}
                        value={genresSelected}
                      >
                        {data.genres.map(genre => (
                          <CustomCheckbox value={genre} key={genre}>
                            {genre}
                          </CustomCheckbox>
                        ))}
                      </CheckboxGroup>
                      {genresSelected.length > 0 && (
                        <div className="py-2">
                          Выбраны: <strong>{genresSelected.join(', ')}</strong>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="mb-3 text-xl font-bold">Год выпуска</h4>
                      <CheckboxGroup
                        orientation="horizontal"
                        onChange={setYearsSelected}
                        value={yearsSelected}
                      >
                        {data.years.map(year => (
                          <CustomCheckbox value={String(year)} key={year}>
                            {year}
                          </CustomCheckbox>
                        ))}
                      </CheckboxGroup>
                      {yearsSelected.length > 0 && (
                        <div className="py-2">
                          Выбраны: <strong>{yearsSelected.join(', ')}</strong>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {!!filterIsSelected && (
                  <Button endContent={<FilterX />} onClick={resetClickHandler}>
                    Сбросить
                  </Button>
                )}

                <Button color="primary" onClick={applyClickHandler}>
                  Применить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchFilter;
