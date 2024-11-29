import { Badge } from '@/components/ui/badge';
import { useGetSingleCategoryQuery } from '@/features/questions/questionsCategoryApi';

const TagsTitle = ({ tagId }) => {
  const { data: tagData } = useGetSingleCategoryQuery({ type: "tags", id: tagId });

  return (
    <Badge variant="outline">
      {tagData?.data?.title}
    </Badge>
  )
}

export default TagsTitle;