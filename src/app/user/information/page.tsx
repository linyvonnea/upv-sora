"use client";

export default function InformationBoardPage() {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold mb-4 text-[#8E1537]">Information Board</h1>
      <p className="text-gray-700 mb-6">
        Welcome to the Information Board! Here you’ll find the latest announcements, updates, and
        important information for UPV-SORA users.
      </p>
      {/* Example announcement */}
      <div className="mb-4 p-4 bg-[#f8e9ed] rounded">
        <h2 className="font-semibold text-[#8E1537]">🎉 System Update</h2>
        <p className="text-sm text-gray-800">
          We’ve added new features to the platform. Check out the Event Requests and Pubmat Request
          tabs for more details!
        </p>
      </div>
    </div>
  );
}
