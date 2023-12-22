"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from '@/firebaseConfig';
import CompletedUploading from './_components/CompletedUploading';
import { generateRandomString } from '@/app/_utils/GenerateRandomString';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


function Upload() {

  const {user} = useUser();

  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileDocId, setFileDocId] = useState();


  const uploadFile = (file) => {

    const metadata = {
      contentType: file.type
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);

        progress === 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // {<CompletedUploading />}
          saveInfo(file, downloadURL);
        });
      })
  }

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString();
    await setDoc(doc(db, "uploadFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      password: '',
      id: docId.trim(),
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL+docId.trim()
    });
    setFileDocId(docId);
  }

  useEffect(() => {
    console.log('trigger');
    progress == 100 && 
    setTimeout(() => {
      setUploadComplete(true);
    }, 2000);
  },[progress == 100]);

  useEffect(() => {
    uploadComplete && 
    setTimeout(() => {
      setUploadComplete(false);
      // window.location.reload();
      console.log('fileDocId', fileDocId);
      router.push('/file-preview/' + fileDocId.trim());
    }, 2000);
  },[uploadComplete]);



  return (
    <div className='p-5 md:px-28'>
      <h2 className='text-[20px] text-center m-5' ><strong className='text-PRIMARY'>Upload </strong>
        files and <strong className='text-PRIMARY'>Share </strong>it</h2>
      <UploadForm onUploadClick={(file) => uploadFile(file)} progress={progress} />
      {/* {progress === 100 && <CompletedUploading />} */}
    </div>
  )
}

export default Upload
