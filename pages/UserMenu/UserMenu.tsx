import MessagesSection from "./MessagesSection";

const UserMenu = () => {
  return (
    <div className="w-[320px] flex h-full justify-between flex-col z-10 relative ">
      <MessagesSection />
      {/* <CallSections /> */}
    </div>
  );
};

export default UserMenu;
