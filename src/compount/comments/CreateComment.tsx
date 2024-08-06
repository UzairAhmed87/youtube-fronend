import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Input from "../helperCompount/Input";
import Button from "../helperCompount/Button";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGetCommentById from "../../hook/useGetVideoCommentById.ts";
import { formatDistanceToNow } from "date-fns";
export default function CreateComments() {
  const { videoId } = useParams();
  interface commentData {
    content: string;
  }
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue } = useForm<commentData>();
  const { getComments, isLoading } = useGetCommentById();
  if (!isLoading) {
    console.log(getComments);
  }
  const CreateComments = async (data: commentData) => {
    setError("");
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const userDetails: commentData = data;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}comment/${videoId}`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response);

        console.log(response.data);
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
        setError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        // No response received from server
        console.log("No response received from server", error.request);
        setError("No response received from server. Please try again later.");
      } else {
        // Other errors
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
    }
  };

  function formatDateRelative(date: Date) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }

  return (
    <div className="bt-8 w-full">
      <div className="bg-slate-800 text-white flex justify-center ">
        <form onSubmit={handleSubmit(CreateComments)}>
          <div className="  max-lg:w-full items-center justify-center w-full">
            <Input
            className='w-full bg-neutral-700 text-white h-3 border-none rounded-none border-b-2 p-2 mt-2 '
              {...register("content", { required: true, minLength: 6 })}
              placeholder={"Write Your comment"}
            />
         <div className="w-full items-end justify-end">
         <Button label={"Post"} type="submit" className={"bg-gray-800"} />
         </div>
          </div>

          <h2 className="text-red-500 font-normal">{error}</h2>
        </form>
      </div>
      <div className="">
        {!isLoading ? (
          getComments &&
          getComments.map((comment, index) => {
            return (
              <div className="flex items-start gap-4 justify-center p-4 rounded-md bg-background shadow-sm">
                <img
                  src={comment.commentUser.avatar}
                  className="h-4 w-3"
                  alt=""
                />
                <div className="flex-1 grid gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">
                      {comment.commentUser.username}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateRelative(comment.createdAt)}
                    </div>
                  </div>
                  <div className="text-muted-foreground">{comment.content}</div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Loawding ..</h2>
        )}
      </div>
    </div>
  );
}
