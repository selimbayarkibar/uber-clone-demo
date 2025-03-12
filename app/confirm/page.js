"use client";
import tw from "tailwind-styled-components";
import Map from "../components/Map";
import RideSelector from "../components/RideSelector";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConfirmComponent />
    </Suspense>
  );
};

const ConfirmComponent = () => {
  const searchParams = useSearchParams();

  const pickup = searchParams.get("pickup");
  const dropoff = searchParams.get("dropoff");

  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?` +
        new URLSearchParams({
          q: pickup,
          access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          setPickupCoordinates(data.features[0].geometry.coordinates);
        }
      });
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?` +
        new URLSearchParams({
          q: dropoff,
          access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN, // ✅ Now uses env variable
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          setDropoffCoordinates(data.features[0].geometry.coordinates);
        }
      });
  };

  useEffect(() => {
    if (pickup) getPickupCoordinates(pickup);
    if (dropoff) getDropoffCoordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search" className="inline-flex">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmRideContainer>
          <ConfirmButton>Confirm Ride</ConfirmButton>
        </ConfirmRideContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Page;

const Wrapper = tw.div`
flex h-screen flex-col
`;

const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`;

const ConfirmRideContainer = tw.div`
p-4 border-t-2
`;

const ConfirmButton = tw.div`
bg-black text-white py-4 text-center text-xl
`;

const BackButton = tw.img`
h-full object-contain
`;

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer h-10 w-10
`;
