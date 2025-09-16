import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/manufacturing/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/manufacturing/"!</div>
}
