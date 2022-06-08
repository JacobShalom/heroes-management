import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../model/hero';
import { Ability } from '../model/ability';
import { Trainer } from '../model/trainer';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  implements InMemoryDbService {
  createDb() {
    const abilities:Ability[] = [
      {abilityId: 1, abilityDesc : 'attaker' },
      {abilityId: 2, abilityDesc : 'defender' }
    ];

    const heroes:Hero[] = [
      { id: '62ea0906-15c4-4483-90da-5d171edbe047', heroName: 'Superman' , abilityId : 1 , createdDate : new Date() , power: 4,trainerId: 'dd4fa53d-3d3f-4e19-9147-a60e5486cf14'},
      { id: '336c2da2-2cb8-403b-9b08-ba9c3720f0c1', heroName: 'Wonder woman', abilityId : 1  , createdDate : new Date(), power: 7,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: '7bdde9ec-bf18-4992-840e-39d791c4b0e1', heroName: 'Ironman', abilityId : 2  , createdDate : new Date() , power: 7,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: 'c51399ba-1abf-4abc-a857-4fdf8ccde234', heroName: 'Bionic' , abilityId : 1 , createdDate : new Date() , power: 7,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: '769cf4eb-1c94-4901-a291-328d9e92bee1', heroName: 'Turbine' , abilityId : 2 , createdDate : new Date() , power: 6,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: '3db8cc0c-3236-41e9-8c55-296f88c3c4a2', heroName: 'Barracuda', abilityId : 1  , createdDate : new Date() , power: 7,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: 'd680ed65-30f3-48f1-9914-2f2f87f7bd8a', heroName: 'Volcanic Ash', abilityId : 1  , createdDate : new Date() , power: 9,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: '2da7f18a-b86a-470e-a412-84eb9563db45', heroName: 'Laser Sight', abilityId : 2  , createdDate : new Date() , power: 7,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: '83c2bc89-6294-44bf-bef9-818203f28fd5', heroName: 'Leviathan' , abilityId : 1 , createdDate : new Date() , power: 8,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'},
      { id: 'dfc30cde-6566-4d2f-93ea-244eec92e54e', heroName: 'Tornado' , abilityId : 2 , createdDate : new Date() , power: 7,trainerId: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450'} ,
      { id: '7015820b-9e8f-4007-ae2e-6dcc88a3bc57', heroName: 'Foxfire' , abilityId : 2 , createdDate : new Date() , power: 5,trainerId: '58e9fda2-b5c9-4d4e-9dd8-3ac4d7e6281f'} ,
      { id: 'eef0d8cd-fda6-4742-94ba-03606db4b6cd', heroName: 'Aquaman' , abilityId : 1 , createdDate : new Date() , power: 7,trainerId: '58e9fda2-b5c9-4d4e-9dd8-3ac4d7e6281f'}
    ];
    const trainers:Trainer[] = [
    { id: 'dd4fa53d-3d3f-4e19-9147-a60e5486cf14', trainerName: 'Alon' , password: 'Alon123!' },
    { id: 'f6b2076f-c7ec-411e-be56-2e44f5cfe450', trainerName: 'Reuven' , password : 'Reuven1!' },
    { id: '58e9fda2-b5c9-4d4e-9dd8-3ac4d7e6281f', trainerName: 'Benny' , password: 'Benny123!' }
  ];
  return {abilities,heroes,trainers};
  }
}
