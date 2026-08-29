import { describe, expect, it } from "vitest";
import { processCommand } from "../command_processor";

describe("command processor", () => {
  it("supports quoted file paths", () => {
    const response = processCommand('vim "notes/todo file.txt"', "/", {});

    expect(response.systemAction).toBe("VIM");
    expect(response.meta?.vimFile).toBe("/notes/todo file.txt");
  });

  it("resolves and reads session files by their canonical path", () => {
    const response = processCommand("cat notes/todo.txt", "/projects", {
      "/projects/notes/todo.txt": {
        content: ["remember this"],
        path: "/projects/notes",
      },
    });

    expect(response.output).toBeTruthy();
  });
});
