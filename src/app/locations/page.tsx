import Container from "@/components/ui/Container";
import LocationsClient from "@/components/location//LocationsClient";

export default function LocationsPage() {
  return (
    <Container>
      <div className="py-10 space-y-4">
        <h1 className="text-2xl font-bold">Choose Your Area</h1>
        <LocationsClient />
      </div>
    </Container>
  );
}
