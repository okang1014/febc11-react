import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const axios = useAxiosInstance();

  const addUser = useMutation({
    mutationFn: async (userInfo) => {
      // 이미지 파일을 우선 서버에 전달
      // 이미지가 있는 경우, userInfo 폼 데이터에 추가하는 작업
      if (userInfo.attach.length > 0) {
        // 새로운 폼 데이터 객체를 생성
        const imageFormData = new FormData();
        // 리액트 훅 폼에 의해 생성된 formData.attach 의 첫번째 항목을 imageFormData 에 attach 라는 속성값으로 append(추가) 후 서버 전송
        imageFormData.append("attach", userInfo.attach[0]);

        // 파일 업로드 요청
        const fileRes = await axios(`/files`, {
          // method 는 별도로 지정해야함 - 왜냐하면 useAxiosInstance 를 사용하는 경우, 두 번째 매개변수가 body 에 추가되어 전달됨
          method: "post",
          headers: {
            // 파일 업로드 시 필요한 설정
            "Content-Type": "multipart/form-data", // 기존에는 application/json, 이미지는 바이너리 형태(파일)의 데이터를 전송
          },
          data: imageFormData, // 이미지 파일이 첨부된 폼 데이터
        });

        userInfo.image = fileRes.data.item[0]; // userInfo(react-hook-form 에 의해 전달받은 사용자 입력 폼 데이터)
        delete userInfo.attach; // 파일을 우선 서버에 전송, userInfo(사용자 입력 폼) 내부의 attach 속성은 삭제
      }

      userInfo.type = "user";

      // userInfo 객체(사용자 입력 폼데이터)는 아래의 정보를 담고 있는 객체
      // const body = {
      //   type: "user",
      //   name: userInfo.name,
      //   email: userInfo.email,
      //   password: userInfo.password,
      //   image: userInfo.image,
      // };

      console.log(userInfo);

      return axios.post(`/users`, userInfo);
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate(`/`); // 메인 페이지로 이동
    },
    onError: (err) => {
      console.error(err);
      // inputError 에 표시되도록
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
        // setError 의 첫번째 인자 error.path 는 에러 객체 내부의 속성(field), 두 번째 인자는 message 속성에 error.msg 를 추가
      } else {
        alert(
          err.response?.data.message || // 기타 에러
            "잠시 후 다시 요청하세요." // 500 에러
        );
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>회원가입 - 멋사컴</title>

        <meta property="og:title" content="회원가입 - 멋사컴" />
        <meta
          property="og:description"
          content="멋사컴에 가입하고 코딩 정보를 공유하세요."
        />
      </Helmet>
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              회원 가입
            </h2>
          </div>

          <form onSubmit={handleSubmit(addUser.mutate)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="name"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("name", { required: "이름은 필수입니다." })}
              />
              <InputError target={errors.name} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("email", { required: "이메일은 필수입니다." })}
              />
              <InputError target={errors.email} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("password", {
                  required: "비밀번호는 필수입니다.",
                })}
              />
              <InputError target={errors.password} />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="attach"
              >
                프로필 이미지
              </label>
              <input
                type="file"
                id="attach"
                accept="image/*"
                placeholder="이미지를 선택하세요"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                {...register("attach")}
              />
            </div>

            <div className="mt-10 flex justify-center items-center">
              <button
                type="submit"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                회원가입
              </button>
              <Link
                to="/"
                className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
