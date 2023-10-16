import Padded from "../layout/padded";
import MainHeading from "../layout/main-heading";
import SubHeading from "../layout/sub-heading";
import FlexCol from "../layout/flex-col";
import Card from "../layout/card";

export default function Page() {
  return (
    <Padded>
      <FlexCol>
        <MainHeading>Reports</MainHeading>
        <Card>
          <SubHeading>Summary</SubHeading>
        </Card>
      </FlexCol>
    </Padded>
  );
}
