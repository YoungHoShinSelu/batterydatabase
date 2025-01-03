import { FacilitySection } from "./status-view/FacilitySection";
import { useFacilities } from "./status-view/useFacilities";
import type { Location } from "@/pages/Customers";

interface StatusViewProps {
  location: Location;
}

export const StatusView = ({ location }: StatusViewProps) => {
  const { facilities, isLoading } = useFacilities(location);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <FacilitySection
        title="Active Partners"
        titleColor="text-success"
        facilities={facilities.activePartners}
      />

      <FacilitySection
        title="Engaged Prospects"
        titleColor="text-warning"
        facilities={facilities.engagedProspects}
      />

      <FacilitySection
        title="No Response"
        titleColor="text-danger"
        facilities={facilities.noResponseContacts}
      />

      <FacilitySection
        title="Declined"
        titleColor="text-muted-foreground"
        facilities={facilities.declinedContacts}
      />
    </div>
  );
};