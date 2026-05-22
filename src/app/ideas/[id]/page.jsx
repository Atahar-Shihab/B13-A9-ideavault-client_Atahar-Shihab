import IdeaDetailsClient from "./IdeaDetailsClient";

export const metadata = { title: "Idea Details" };

export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;
  return <IdeaDetailsClient id={id} />;
}
