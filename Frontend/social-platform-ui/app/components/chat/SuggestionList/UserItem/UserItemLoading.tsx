const UserItemSkeleton = () => {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted animate-pulse shadow-sm">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-input" />

            {/* Name */}
            <div className="flex-1 space-y-2">
                <div className="h-3 w-1/2 bg-input rounded" />
            </div>

            {/* Button */}
            <div className="h-8 w-16 bg-input rounded-md" />
        </div>
    );
};

export default UserItemSkeleton;