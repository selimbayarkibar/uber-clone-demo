"use client";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";
import { useEffect, useState } from "react";

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);

  useEffect(() => {
    const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Your access token

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=${MAPBOX_ACCESS_TOKEN}&geometries=geojson`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Mapbox API Response:", data); //Debugging log
        if (data.routes && data.routes.length > 0) {
          const duration = data.routes[0].duration / 60; // Price calculator
          setRideDuration(duration);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error); //Debugging log
        setRideDuration(0);
      }); // Ensure a valid state even if the fetch fails
  }, [pickupCoordinates, dropoffCoordinates]);

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <RideList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 min away</Time>
            </CarDetails>
            <Price>{"$" + (rideDuration * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </RideList>
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`
flex-1 flex flex-col overflow-y-scroll
`;

const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b
`;

const RideList = tw.div`
overflow-y-scroll
`;

const Car = tw.div`
flex p-4 items-center cursor-pointer hover:bg-gray-200 transition
`;

const CarImage = tw.img`
h-14 mr-2
`;

const CarDetails = tw.div`
flex-1
`;

const Service = tw.div`
font-md
`;

const Time = tw.div`
text-xs text-blue-500
`;

const Price = tw.div`
text-sm
`;
