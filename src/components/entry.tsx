"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Dialog } from "./dialog";

type TPages = { id: number; name: string };
type TItem = { result: number; name: string; text: string };

export const Entry = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(+searchParams.get("page")! || 1);
  const [data, setData] = useState<TPages[] | null>(null);
  const [result, setResult] = useState<TItem | null>(null);

  useEffect(() => {
    axios
      .get(`https://taxivoshod.ru/testapi/?w=list&page=${page}`)
      .then((res) => setData(res.data.items as TPages[]));
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  let items = [];
  for (let number = 1; number <= 2; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const [modal, setModal] = useState<boolean>(false);

  const get = async (id: number) => {
    await axios
      .get(`https://taxivoshod.ru/testapi/?w=item&id=${id}`)
      .then((r) => {
        setResult(r.data as TItem);
        router.push(`?w=list&page=${page}/?w=item&id=${id}`);
        setModal((modal) => !modal);
      });
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      get(+id);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-4 items-center mt-4">
      <ul className="list-group w-64 text-center">
        {data?.map((item) => (
          <li
            key={item.id}
            className="list-group-item cursor-pointer"
            onClick={() => {
              get(item.id);
            }}
          >
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      <Dialog state={modal}>
        <div className=" w-96 h-48 flex flex-col gap-4 items-center justify-center">
          <p>ID: {result?.result}</p>
          <h2>{result?.name}</h2>
          <p>{result?.text}</p>
        </div>
      </Dialog>
      <Pagination>{items}</Pagination>
    </div>
  );
};
