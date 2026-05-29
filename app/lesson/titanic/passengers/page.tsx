"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE = 50;

type Passenger = {
  id: number;
  passengerId: string;
  survived: string;
  pclass: string;
  name: string;
  gender: string;
  age: string;
  sibsp: string;
  parch: string;
  ticket: string;
  fare: string;
  cabin: string;
  embarked: string;
};

type PassengerResponse = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  items: Passenger[];
};

export default function TitanicPassengersPage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<PassengerResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function loadPassengers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/backend/titanic/walter/passengers?page=${page}&page_size=${PAGE_SIZE}`,
          { cache: "no-store" },
        );
        const json = (await res.json()) as PassengerResponse;
        if (!res.ok) {
          throw new Error("승객 목록을 불러오지 못했습니다.");
        }
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "불러오기 오류가 발생했습니다.");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadPassengers();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = data?.totalPages ?? 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
          LESSON
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">승객 목록</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          한 페이지당 50명씩 표시됩니다.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-xl border bg-card p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>PassengerId</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Pclass</TableHead>
              <TableHead>Survived</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  불러오는 중...
                </TableCell>
              </TableRow>
            ) : data?.items?.length ? (
              data.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.passengerId}</TableCell>
                  <TableCell className="max-w-[280px] truncate">{item.name}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.pclass}</TableCell>
                  <TableCell>{item.survived}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  승객 데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((prev) => Math.max(prev - 1, 1));
              }}
            />
          </PaginationItem>

          {pageNumbers.map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#"
                isActive={n === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(n);
                }}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((prev) => Math.min(prev + 1, totalPages));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
