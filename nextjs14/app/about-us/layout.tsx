export default function AboutUsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
            &copy; Next JS is greate!
        </div>
    )
}
