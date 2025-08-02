import { PrismaClient, User } from "../src/client";
import { mock, mockDeep, mockReset } from "vitest-mock-extended";
import createUser from "../src/user";

const prisma = mockDeep<PrismaClient>();
const MockUser = {
  email: "email",
  id: "id",
  name: "name",
};
describe("User", () => {
  let user: ReturnType<typeof createUser>;

  beforeEach(() => {
    mockReset(prisma);
    user = createUser(prisma);
  });

  it("should configures client", () => {
    expect(user.client).toBeDefined();
  });

  it("should upsert user", async () => {
    await user.upsert(MockUser);
    expect(prisma.user.upsert).toBeCalledWith({
      where: { email: MockUser.email },
      create: MockUser,
      update: MockUser,
    });
    expect(user).toBeDefined();
  });

  it("should remove user", async () => {
    await user.remove("id");
    const id = "id";

    expect(prisma.user.delete).toBeCalledWith({ where: { id } });
    await user.remove(id);
  });

  it("should find first user", async () => {
    const email = "me@itstoni.com";
    await user.findFirst({
      email,
    });

    expect(prisma.user.findFirst).toBeCalledWith({ where: { email } });
  });
});
