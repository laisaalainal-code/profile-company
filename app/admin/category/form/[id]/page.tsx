import { CategoryForm } from "../category-form"

type EditCategoryPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({params,}: EditCategoryPageProps) {
  const { id } = await params

  return <CategoryForm categoryId={id} />
}
