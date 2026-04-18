import { describe, it, expect } from 'vitest';
import { resolvePath } from '../path';

/**
 * @file path.test.ts
 * @description Unit tests for the Path Normalization Engine.
 */

describe('Path Resolver Utility', () => {

    it('should resolve a simple relative path', () => {
        const cwd = '/projects';
        const target = 'web';
        expect(resolvePath(cwd, target)).toBe('/projects/web');
    });

    it('should handle ".." to move up a directory', () => {
        const cwd = '/projects/web';
        const target = '..';
        expect(resolvePath(cwd, target)).toBe('/projects');
    });

    it('should prevent navigating above the root directory', () => {
        const cwd = '/';
        const target = '../../..';
        expect(resolvePath(cwd, target)).toBe('/');
    });

    it('should ignore "." current directory markers', () => {
        const cwd = '/projects';
        const target = './web/./config';
        expect(resolvePath(cwd, target)).toBe('/projects/web/config');
    });

    it('should prioritize absolute paths over the CWD', () => {
        const cwd = '/projects/web';
        const target = '/home/resume.txt';
        expect(resolvePath(cwd, target)).toBe('/home/resume.txt');
    });
});