import { FC } from 'react';
import Col from '@/components/shared/layout/Col';
import Row from '@/components/shared/layout/Row';
import TitleList from '@/components/widgets/Title/TitleList';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { getTitlesList } from '@/services/api/anilibria/getTitlesList';
import { anilibriaApi } from '@/services/api/anilibria/Anilibria.api';

interface TitleFranchiseProps {
  slug: string;
}

const TitleFranchise: FC<TitleFranchiseProps> = ({ slug }) => {
  const { data: title } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  const franchiseSlugList = title.franchises
    .map(({ releases }) =>
      releases.map(release => release.code).filter(slug => slug !== title.code)
    )
    .flat();

  const { data: franchise, isSuccess: franchiseIsSuccess } = useQuery({
    queryKey: [AnilibriaQueryKeys.TITLE_LIST, franchiseSlugList],
    queryFn: () => getTitlesList({ code_list: franchiseSlugList }),
    enabled: franchiseSlugList.length > 0,
  });

  return (
    franchiseIsSuccess && (
      <Col xs={12}>
        <h2 className="mb-6 pt-8 text-center text-3xl">Связанное</h2>
        <Row className="mb-12">
          <TitleList list={franchise} />
        </Row>
      </Col>
    )
  );
};

export default TitleFranchise;
