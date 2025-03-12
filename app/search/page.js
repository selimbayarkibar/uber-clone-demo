"use client";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { useState } from "react";

const Search = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/" className="inline-flex">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <InputContainer>
        <FromToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/?size=100&id=118834&format=png&color=9ca3af" />
          <Square src="https://img.icons8.com/?size=100&id=fkiVxojF7Mkw&format=png&color=000000" />
        </FromToIcons>

        <InputBoxes>
          <Input
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          ></Input>
          <Input
            placeholder="Where to?"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          ></Input>
        </InputBoxes>

        <PlusIcon src="https://img.icons8.com/?size=100&id=11153&format=png&color=000000" />
      </InputContainer>
      <SavedPlaces>
        <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
        Saved Places
      </SavedPlaces>
      <Link
        href={{
          pathname: "/confirm",
          query: {
            pickup: pickup,
            dropoff: dropoff,
          },
        }}
      >
        <ConfirmLocationContainer>
          <ConfirmLocationButton>Confirm Locations</ConfirmLocationButton>
        </ConfirmLocationContainer>
      </Link>
    </Wrapper>
  );
};

export default Search;

const Wrapper = tw.div`
bg-gray-200 h-screen

`;

const ButtonContainer = tw.div`
bg-white px-4
`;

const BackButton = tw.img`
h-12 cursor-pointer
`;

const FromToIcons = tw.div`
w-10 flex flex-col mr-2 items-center
`;

const InputContainer = tw.div`
bg-white flex items-center px-4 mb-2
`;

const Circle = tw.img`
h-2.5 
`;

const Line = tw.img`
h-10
`;

const Square = tw.img`
h-3
`;

const InputBoxes = tw.div`
flex flex-col flex-1
`;

const Input = tw.input`
h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`;

const PlusIcon = tw.img`
w-10 h-10 bg-gray-200 rounded-full ml-3
`;

const SavedPlaces = tw.div`
flex items-center bg-white px-4 py-2
`;

const StarIcon = tw.img`
bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
`;

const ConfirmLocationContainer = tw.div`
flex justify-center items-center py-2 px-4
`;
const ConfirmLocationButton = tw.button`
bg-black text-white w-full py-2 rounded-sm text-xl
`;
