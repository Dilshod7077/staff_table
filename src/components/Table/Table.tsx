import React, { useState, useCallback } from "react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { fetchRecords } from "../../services/api";
import { Record } from "../../types/index";
import { translations } from "../../translations";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";

interface TableProps {
  fields: (keyof Record)[];
}

const CustomTable: React.FC<TableProps> = ({ fields }) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreRecords = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    try {
      const newRecords = await fetchRecords(page, 10);
      if (newRecords.length === 0) {
        setHasMore(false);
      } else {
        setRecords((prevRecords) => [...prevRecords, ...newRecords]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMoreRecords,
  });

  return (
      <Table
        isHeaderSticky
        isStriped
        aria-label="Example static collection table"
        baseRef={scrollerRef}
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="success" size="lg" />
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[600px] overflow-scroll",
          table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          {fields.map((field) => (
            <TableColumn className=" text-sm font-extrabold" key={field}>
              {translations[field]}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner color="success" size="lg" />}
          emptyContent={"Нет данных!"}
        >
          {records.map((record) => (
            <TableRow key={record.id}>
              {fields.map((field) => (
                <TableCell key={field}>{record[field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default CustomTable;
