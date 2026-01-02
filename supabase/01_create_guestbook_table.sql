-- Create guestbook table
create table public.guestbook (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  content text not null,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security (RLS)
alter table public.guestbook enable row level security;

-- Create policies
-- 1. Allow everyone to read messages
create policy "Anyone can view guestbook messages"
on public.guestbook for select
using ( true );

-- 2. Allow everyone to insert messages (anon)
create policy "Anyone can post guestbook messages"
on public.guestbook for insert
with check ( true );
