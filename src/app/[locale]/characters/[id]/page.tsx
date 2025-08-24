import CharacterDetails from '@/components/CharacterDetails';

type CharacterPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;

  return <CharacterDetails id={Number(id)} />;
}

