<<<<<<< HEAD
import { Link } from "react-router-dom";

export default function Edit() {
=======
import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Edit() {

  const { type, _id } = useParams();
  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ['posts', _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: res => res.data,
    staleTime: 1000*10,
  });

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: data?.item.title,
      content: data?.item.content,
    }
  });  

  const queryClient = useQueryClient();

  const updateItem = useMutation({
    mutationFn: formData => axios.patch(`/posts/${_id}`, formData),
    onSuccess: () => {
      alert('게시물이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['posts', _id] });
      navigate(`/${type}/${_id}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

>>>>>>> b2c9403fa9cef9b4f17a294222cf4f529bc7bb22
  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 수정</h2>
      </div>
      <section className="mb-8 p-4">
<<<<<<< HEAD
        <form action="/info/1">
=======
        <form onSubmit={ handleSubmit(updateItem.mutate) }>
>>>>>>> b2c9403fa9cef9b4f17a294222cf4f529bc7bb22
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요." 
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
<<<<<<< HEAD
              name="title"
              defaultValue="좋은 소식이 있습니다."
            />

            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">제목은 필수 입니다.</p>
=======
              { ...register('title', { required: '제목은 필수입니다.' }) }
            />
            <InputError target={ errors.title } />
>>>>>>> b2c9403fa9cef9b4f17a294222cf4f529bc7bb22
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">내용</label>
            <textarea 
              id="content"
              rows="15" 
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
<<<<<<< HEAD
              name="content"
              defaultValue="좋은 소식 감사합니다."
            />

            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">내용은 필수입니다.</p>
=======
              { ...register('content', { required: '내용은 필수입니다.' }) }
            />
            <InputError target={ errors.content } />
>>>>>>> b2c9403fa9cef9b4f17a294222cf4f529bc7bb22
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</button>
<<<<<<< HEAD
            <Link to="/info/1" className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
=======
            <Link to={`/${type}/${_id}`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
>>>>>>> b2c9403fa9cef9b4f17a294222cf4f529bc7bb22
          </div>
        </form>
      </section>
    </main>
  );
}