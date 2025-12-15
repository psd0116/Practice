export function ProfileSidebar() {
  return (
    // 부모 그리드(12칸) 중 3칸 차지 (md:col-span-3)
    <aside className="md:col-span-3 md:pt-4">
      <div className="flex flex-col items-start">
        
        {/* 프로필 사진 */}
        <div className="relative w-full max-w-[260px] aspect-square rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800 mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=460&v=4" 
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        {/* 닉네임 및 정보 */}
        <h2 className="text-2xl font-bold tracking-tight">
          Void* User
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light mb-4">
          psd0116
        </p>

        {/* 버튼 */}
        <button className="w-full mb-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md dark:bg-[#21262d] dark:text-gray-200 dark:border-[#30363d] dark:hover:bg-[#30363d] transition-colors">
          Edit profile
        </button>

         {/* 팔로워 정보 */}
         <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="text-gray-500"><path d="M2 5.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm3.5-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm9 5.5c0 1.296-.78 2.435-1.898 3a2.604 2.604 0 0 1-2.22 0C9.618 11.132 9 10.274 9 9c0-.63.18-1.23.53-1.773.154-.242.417-.47.711-.677.666-.47 1.658-.95 2.759-1.326C14.322 4.82 15 4.205 15 3.5c0-1.346-1.147-2.5-2.5-2.5-1.353 0-2.5 1.154-2.5 2.5a.5.5 0 0 0 1 0c0-.793.706-1.5 1.5-1.5.793 0 1.5.707 1.5 1.5 0 .028-.008.054-.02.08l-.02.034c-.111.17-.388.345-.78.582-1.052.635-2.508 1.33-4.19 1.819a3.627 3.627 0 0 0-1.72 1.116A3.613 3.613 0 0 0 8 9c0 1.507.626 2.896 1.632 3.903a3.606 3.606 0 0 0 2.266 1.056 3.608 3.608 0 0 0 2.268-1.058c1.005-1.008 1.632-2.397 1.632-3.901a.5.5 0 0 0-1 0Zm-7.5 0c0 1.126.618 1.985 1.119 2.442.5.456 1.206.808 2.22.808s1.72-.352 2.22-.808C12.619 10.985 13.236 10.126 13.236 9c0-1.126-.618-1.985-1.119-2.442-.5-.456-1.206-.808-2.22-.808s-1.72.352-2.22.808C8.119 7.015 7.5 7.874 7.5 9ZM5.5 11h-3A1.5 1.5 0 0 0 1 12.5v1.988a1.517 1.517 0 0 0 1.502 1.51h2.996A1.517 1.517 0 0 0 7 14.489V12.5A1.5 1.5 0 0 0 5.5 11Zm1.5 1.5v1.988a.517.517 0 0 1-.502.511H3.502A.517.517 0 0 1 3 14.489V12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5Z"></path></svg>
            <span className="font-bold text-black dark:text-white">5</span> followers
            <span>·</span>
            <span className="font-bold text-black dark:text-white">6</span> following
         </div>
      </div>
    </aside>
  );
}