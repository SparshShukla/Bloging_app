import { Appbar } from "./AppBar";

export const Skeleton = () => {
  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div>
        <Skel />
        <Skel />
        <Skel />
        <Skel />
        <Skel />
      </div>
    </div>
  );
};

const Skel = () => {
  return (
    <div className="flex grid grid-cols-9 pt-6">
      <div className="col-start-3 col-span-5">
        <div className="border border-blue-100 shadow rounded-md p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-400 h-10 w-10"></div>
            <div className="flex-1 space-y-10 py-1">
              <div className="h-2 bg-slate-400 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
