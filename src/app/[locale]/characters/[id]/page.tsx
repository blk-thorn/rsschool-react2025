import CharacterDetails from '@/components/CharacterDetails';

export default function CharacterPage({ params }: { params: { id: string } }) {
  return <CharacterDetails id={Number(params.id)} />;
}
