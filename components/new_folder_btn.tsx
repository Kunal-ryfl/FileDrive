"use client"
import React from 'react'
import axios from 'axios';
import { Button } from './ui/button';
import {PlusCircle } from 'lucide-react'
export const NewFolderBtn =  ({parentId}:{parentId:string}) => {

    const onSubmit = async() => {
        try {
          await axios.post("/api/newFolder", {name:'nested2',parentId});
        } catch (error) {
          console.log(error);
        }
      }
  
    return (
        <Button  className='  gap-2' onClick={onSubmit} >
       <PlusCircle  className=' '/>
        new folder
      </Button>
)
}
