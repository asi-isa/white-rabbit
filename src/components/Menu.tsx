interface MenuProps {}

const Menu = ({}: MenuProps) => {
  return (
    <div className="flex flex-col gap-8 shrink-0 py-4 px-8">
      <div>
        <p>white rabbit</p>
      </div>

      {/* Friends */}
      <div>
        <p>Venice Base</p>
        <p>Base Venice</p>

        {/* AddFriend */}
        <div className="mt-3">
          <p>+ add friend</p>
        </div>
      </div>

      <div className="mt-auto">
        <p>settings</p>
      </div>
    </div>
  );
};

export default Menu;
