
const ProfileLayout = ({children}:any) => {
  return (
    <div className="mt-12">
      <div className="pt-12 border-t border-gray-200 grid grid-cols-3 xs:gap-2 lg:gap-12 md:gap-8 sm:gap-4">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
