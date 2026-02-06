import { Portal } from "../Portal";

// components/FullScreenLoading.tsx
export default function FullScreenLoading() {
    return (
        <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
            </div>
        </Portal>
    );
}
