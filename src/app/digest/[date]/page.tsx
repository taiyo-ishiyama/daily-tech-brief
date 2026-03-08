interface DigestDetailPageProps {
  params: Promise<{ date: string }>;
}

export default async function DigestDetailPage({ params }: DigestDetailPageProps) {
  const { date } = await params;
  void date;
  return null;
}
