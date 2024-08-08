import React from 'react'
import useGetUserProfile from "../../hook/useGetUserProfile"

export default function ProfileAvatar() {
    const { userProfile, isProfileLoading } = useGetUserProfile();
    log
    return (
    <div>
        {!isProfileLoading
        ? userProfile && (
            <header className="relative h-52 overflow-hidden">
              <img
                src={userProfile.coverImage}
                alt="Cover image"
                className="absolute inset-0 h-52 w-full object-cover bg-no-repeat"
                style={{ aspectRatio: "1920/480", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <img
                  src={userProfile.avatar}
                  className="h-12 w-12 rounded-lg"
                  alt=""
                />
                <div className="space-y-1 text-white">
                  <h2 className="text-2xl font-bold">{userProfile.username}</h2>
                  <h2>Subscriber {userProfile.subscribersCount}</h2>
                </div>
              </div>
            </header>
          )
        : null}
    </div>
  )
}
