
import { db } from "../../firebase/firebase"
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const Question =()=>{


async function getDocumentAndField() {
  const collectionRef = collection(db, 'problems'); // Replace with your collection name
  const documentRef = doc(collectionRef, 'problem1'); // Replace with your document ID

  const docSnap = await getDoc(documentRef);
  if (docSnap.exists) {
    const data = docSnap.data();
    const fieldName = 'QuestionDetails'; // Replace with your field name
    const fieldValue = data[fieldName];
    console.log('Field value:', fieldValue);
  } else {
    console.log('No such document!');
  }
}

getDocumentAndField();


  return (

    <div>
        Hello


    </div>
  )



  
}