import { Skeleton } from "@/components";
import { Table } from "@radix-ui/themes";
import IssueAction from "./IssueAction";

const Loading = () => {
  const placeholder = [1, 2, 3, 4, 5];
  return (
    <div className="p-4">
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {placeholder.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton height={50} />
                <p className="block md:hidden text-xs mt-2 font-thin">
                  <Skeleton height={20} />
                </p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton height={50} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton height={50} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Loading;
