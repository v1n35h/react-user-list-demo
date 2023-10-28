import { useQuery } from "@tanstack/react-query";
import { User } from "./App.types"
import { Container } from "./components/ui/container";
import { Button } from "./components/ui/button";
import React, { useState } from "react";
import { Skeleton } from "./components/ui/skeleton";
import UserModal from "./components/UserModal";
import UserCard from "./components/UserCard";

function App() {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false);
  const [selectedUser, setUser] = useState<User | null>(null);

  const handleCardClick = (user: User) => {
    setUser(user)
    setOpen(true)
  }

  const {
    data,
    error,
    status,
  } = useFetchUsers(page);

  return (
    <React.Fragment>
      <section className="py-20">
        <Container>
          {status === 'pending' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(9)].map(index => (
                <div key={index}>
                  <Skeleton className="aspect-square" />
                </div>
              ))}
            </div>
          ) : status === 'error' ? (
            <div>Error: {error.message}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.results.map((user: User, index: number) => (
                <UserCard user={user} key={index} onClick={() => handleCardClick(user)} />
              ))}
            </div>
          )}
          <div className="space-x-3 mt-5">
            <Button disabled={page === 1} onClick={() => setPage(old => old - 1)}>Previous</Button>
            <Button disabled={data?.results?.length === 0} onClick={() => setPage(old => old + 1)}>Next</Button>
          </div>
        </Container >
      </section>
      <UserModal open={open} setOpen={setOpen} user={selectedUser} />
    </React.Fragment>
  )
}

export default App

function useFetchUsers(page: number) {

  const fetchUsers = async (pageParam: number) => {
    const res = await fetch(`https://randomuser.me/api/?page=${pageParam}&results=10`)
    return res.json()
  }

  const data = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
  })

  return data;
}