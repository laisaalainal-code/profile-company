import { JurusanForm } from "../jurusan-form"

type EditJurusanPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditJurusanyPage({params,}: EditJurusanPageProps) {
  const { id } = await params

  return <JurusanForm jurusanId={id} />
}
