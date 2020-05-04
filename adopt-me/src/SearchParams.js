import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from './Results';
import useDropdown from "./useDropdown";

const SearchParams = () => {
	// Here we are destructuring it.
	// useState returns array two things: State & Updater functiom.
	const [location, setLocation] = useState("Seattle, WA");
	const [breeds, setBreeds] = useState([]);
	const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
	const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
	const [pets, setPets] = useState([]);


	async function requestPets() {
		const { animals } = await pet.animals({
		  location,
		  breed,
		  type: animal
		});
	
		console.log("animals", animals);
	
		setPets(animals || []);
		}

	useEffect(() => {
		setBreeds([]);
		setBreed("");

		pet.breeds(animal).then(({ breeds: apiBreeds }) => {
			const breedString = apiBreeds.map(({ name }) => name);
			setBreeds(breedString);
		}, console.error);
	}, [animal, setBreed, setBreeds]);
	// console.log(pet.breeds("dog"))

	return (
		<div className="search-params">
			<form onSubmit={(e) => {
				e.preventDefault();
				requestPets();
			}}
			>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						placeholder="location"
						onChange={event => setLocation(event.target.value)}
					/>
				</label>
				{/* <label htmlFor="animal">
					Animal
					<select
						id="amimal"
						value={animal}
						onChange={event => setAnimal(event.target.value)}
						onBlur={e => setAnimal(e.target.value)}
					>
						<option>All</option>
						{ANIMALS.map(animal => (
							<option key={animal} value={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						value={breed}
						onChange={e => setBreed(e.target.value)}
						onBlur={e => setBreed(e.target.value)}
						disabled={breeds.length === 0}
					>
						<option>All</option>
						{breeds.map(breedString => (
							<option key={breedString} value={breedString}>
								{breedString}
							</option>
						))}
					</select>
				</label> */}
				<AnimalDropdown />
				<BreedDropdown />
				<button>Submit</button>
				<Results pets={pets} />
			</form>
		</div>
	);
};

export default SearchParams;
