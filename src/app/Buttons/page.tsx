import Button from "@/components/ui/Button";

// Detta är en sida som visar alla varianter av knappar som finns i Button-komponenten. 

export default function ButtonsPage() {
  return (
    <div className="p-10 flex flex-col gap-4">
      <Button variant="orange" size="xs">Button</Button>
      <Button variant="orange" size="sm">Button</Button>
      <Button variant="orange" size="md">Button</Button>
      <Button variant="orange" size="lg">Button</Button>
      <Button variant="orange" size="xl">Button</Button>
      <Button variant="orange" size="2xl">Button</Button>

      <Button variant="dark" size="xs">Button</Button>
      <Button variant="dark" size="sm">Button</Button>
      <Button variant="dark" size="md">Button</Button>
      <Button variant="dark" size="lg">Button</Button>
      <Button variant="dark" size="xl">Button</Button>
      <Button variant="dark" size="2xl">Button</Button>

      <Button variant="orange" size="xs" buttonStyle="icon">○</Button>
      <Button variant="orange" size="sm" buttonStyle="icon">○</Button>
      <Button variant="orange" size="md" buttonStyle="icon">○</Button>
      <Button variant="orange" size="lg" buttonStyle="icon">○</Button>
      <Button variant="orange" size="xl" buttonStyle="icon">○</Button>
      <Button variant="orange" size="2xl" buttonStyle="icon">○</Button>


      <Button variant="dark" size="xs" buttonStyle="icon">○</Button>
      <Button variant="dark" size="sm" buttonStyle="icon">○</Button>
      <Button variant="dark" size="md" buttonStyle="icon">○</Button>
      <Button variant="dark" size="lg" buttonStyle="icon">○</Button>
      <Button variant="dark" size="xl" buttonStyle="icon">○</Button>
      <Button variant="dark" size="2xl" buttonStyle="icon">○</Button>
    </div>
  );
}