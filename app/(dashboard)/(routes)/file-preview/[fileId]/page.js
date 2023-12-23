"use client"
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app } from '@/firebaseConfig';
import Link from 'next/link';
import { ArrowLeftSquare } from 'lucide-react';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';
import { useUser } from '@clerk/nextjs';


function FilePreview({ params }) {

  const db = getFirestore(app);
  const {user} = useUser();
  // console.log(user?.primaryEmailAddress?.emailAddress);
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(params?.fileId);
    console.log("soham");
    params?.fileId && getFileInfo();
  }, [params?.fileId])

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadFile", " " + params?.fileId);
    const docSnap = await getDoc(docRef);
    // console.log(docRef.path)
    // const querySnapshot = await getDocs(collection(db, "uploadFile"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
//     const q = query(collection(db, "uploadFile"), where("id", "==", "CDDADD" ));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFile(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // const file = {
  //   fileName: "marker_green.png",
  //   fileSize:1744,
  //   fileType:"image/png",    
  //   fileUrl:"https://firebasestorage.googleapis.com/v0/b/c-ev-charging-8a34c.appspot.com/o/file-upload%2Fmarker_green.png?alt=media&token=f5934a47-0a50-4ddd-b7b4-e1332392ff71",
  //   id:" EDDFAE",
  //   password:"",
  //   shortUrl:"http://localhost:3000/ EDDFAE",
  //   userEmail:"sohamkelaskar@gmail.com",
  //   userName:"noob stir",
  // }

const onPasswordSave = async (password) => {
  const washingtonRef = doc(db, "uploadFile", " " + params?.fileId);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  password: password
});
console.log("updated");
}

  return (
    <div className='py-10 px-20'>
      <Link href='/upload' className='flex gap-3'>
        <ArrowLeftSquare /> Go to Uplaod
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
        <FileInfo file={file} />
        <FileShareForm file={file}
        onPasswordSave={(password) => onPasswordSave(password)} />
      </div>
    </div>
  )
}

export default FilePreview
