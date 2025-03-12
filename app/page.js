"use client";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User Logged In:", user);
        setUser({
          name: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, [router]);
  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" />
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImageContainer>
              <UserImage
                src={user && user.photoURL}
                onClick={() => signOut(auth)}
              />
              <Tooltip>Sign Out</Tooltip>
            </UserImageContainer>
          </Profile>
        </Header>
        <ActionButtons>
          <Link href="/search" className="flex-1">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
            Wheels
          </ActionButton>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reserve
          </ActionButton>
        </ActionButtons>
        <InputButton>Where to?</InputButton>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex
flex-col
h-screen

`;

const ActionItems = tw.div`
flex-1
p-4
`;

const Header = tw.div`
flex justify-between items-cemter
`;

const UberLogo = tw.img`
h-28
`;

const Profile = tw.div`
flex
items-center
`;
const Name = tw.div`
mr-4 w-20 text-sm
`;

const UserImageContainer = tw.div`
relative group
`;

const UserImage = tw.img`
h-12 w-12 rounded-full border border-gray-200 p-px hover:cursor-pointer
`;

const Tooltip = tw.div`
absolute bottom-[-27px] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-80 transition-opacity`;

const ActionButtons = tw.div`
flex
`;
const ActionButton = tw.div`
flex flex-col bg-gray-200 flex-1 m-1 h-32 items-center justify-center rounded-lg transform hover:scale-105 transition text-xl
`;
const ActionButtonImage = tw.img`
h-3/5
`;
const InputButton = tw.div`
h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8 
`;
