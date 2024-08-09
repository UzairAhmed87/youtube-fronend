import axios from "axios";
import{ useState } from "react";
import { useNavigate } from "react-router";


import Input from "./helperCompount/Input";
import Button from "./helperCompount/Button";
import ButtonWarning from "./helperCompount/ButtonWarning";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUpload}  from "@fortawesome/free-solid-svg-icons"
import getRefreshToken from "../config"
export default function PublishVideoCompount() {
  const [uploadLoading,setUploadLoading] = useState(false)
  const [error, setError] = useState("");
  // if (!isVisible) return null; 
  const Dispatch = useDispatch();
  const [createBtn ,setCreateBtn ] = useState(false)
   interface CreateuserSchema{
    title:string,
    description:string,
    videoFile:File
    ,thumbnail:File
   }
   const Navigator = useNavigate()
   if(getRefreshToken){
       Navigator('/signup')
       return console.log("logout ")
     }


  const { register, handleSubmit,watch,formState:{errors} } = useForm<CreateuserSchema>();

  const thumbnail = watch('thumbnail')
  const videoFile  = watch('videoFile') 
  
  const createUser = async (data:CreateuserSchema) => {
     
    const formData = new FormData()
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);


    try {
    
        const userDetails = data;
      console.log(userDetails ,"sa");
      setUploadLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}video/publish`,
        formData,
        {  headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":`Bearer ${getRefreshToken}`
          },
        }
      );
      console.log(response);
      
      if (response.status >= 200 && response.status < 300) {
   
        setUploadLoading(false)
         console.log(response.data);
         Navigator(`/profile/${localStorage.getItem('username')}`)

         
       
      }

      return userDetails;
    } catch (error :any ) {
      setUploadLoading(false)

      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(`Error response from server: ${error.response.status} - ${error.response.data}`);
        setError(`Error: ${error.response.data.message || 'Server Error'}`);
      } else if (error.request) {
        // No response received from server
        console.log('No response received from server', error.request);
        setError('No response received from server. Please try again later.');
      } else {
        // Other errors
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
    
    }
  };

  return (
   
   <div className="bg-black">
      
      {
         <div className="flex w-full justify-center">
        <div className=" bg-white h-full w-1/2 max-lg:w-full  text-center flex items-center justify-center flex-col ">
          <h2 className="!text-black font-semibold text-2xl pb-3">Publish Video </h2>
         
          <form onSubmit={handleSubmit(createUser)}>
            <div className="flex flex-col w-96 max-lg:w-full justify-center items-center" >

            
            
            <Input
              {...register("title", { required: true, minLength: 2 })}
              type={"text"}
              placeholder={"title..."}
              label={"Title"}
            />
             {errors.title && <p className="text-red-500 text-sm"> Title  is required plz  atlest 3 characters.</p>}

            <Input
              {...register("description", { required: true, })}
              type={"text"}
              placeholder={"description"}
              label={"Description"}
            />
             {errors.description && <p className="text-red-500 text-sm"> Title  is required plz atlest 3 characters .</p>}

            
            <Input
              {...register("thumbnail", { required: true})}
              placeholder="Thumnail Image"
              type="file"
              label={"thumnail"}
              accept="image/*" 
            />
             {errors.thumbnail && <p className="text-red-500 text-sm"> Thumnail image  is required plz  .</p>}

            <Input
              {...register("videoFile", 
                { required: true},
              )
            }
            placeholder="Video"
            accept="video/*" 
              type='file'
              label={"videoFile"}
            />
             {errors.videoFile && <p className="text-red-500 text-sm"> video    is required plz  .</p>}

            </div>
          {
            !uploadLoading ? <div className=""><Button label={'Publish Video'} type="submit" className={'bg-gray-800'} /><FontAwesomeIcon icon={faUpload} /></div> : 
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            
          }
          </form>
          <h2 className="text-red-500 font-normal">{error}</h2>
          
          
          
        </div>
        
      </div>
      }
    </div>
  );
}

// return (
//   <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
//           Create
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Create New Item</DialogTitle>
//           <DialogDescription>Fill out the form to create a new item.</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid items-center grid-cols-4 gap-4">
//             <Label htmlFor="file" className="text-right">
//               File
//             </Label>
//             <Input id="file" type="file" className="col-span-3" />
//           </div>
//           <div className="grid items-center grid-cols-4 gap-4">
//             <Label htmlFor="title" className="text-right">
//               Title
//             </Label>
//             <Input id="title" placeholder="Enter a title" className="col-span-3" />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" className="mr-auto">
//             Cancel
//           </Button>
//           <Button type="submit">Next</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   </div>
// )
