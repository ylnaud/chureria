import {describe, it, expect, vi} from 'vitest';
import eleventyConfig from './.eleventy.js';
import {eleventyImageTransformPlugin} from "@11ty/eleventy-img";
import eleventyGoogleFonts from "eleventy-google-fonts";
import htmlmin from "html-minifier-terser";
import CleanCSS from "clean-css";
import * as terser from "terser";

vi.mock('clean-css');
vi.mock('html-minifier-terser');
vi.mock('terser');

describe('Eleventy Configuration', () => {
    it('test_css_minification', () => {
        const mockCssCode = 'body { color: red; }';
        const mockMinifiedCss = 'body{color:red}';
        CleanCSS.mockImplementation(() => ({
            minify: () => (
                {styles: mockMinifiedCss}
            )
        }));

        const result = eleventyConfig.addFilter('cssmin', mockCssCode);
        expect(result).toBe(mockMinifiedCss);
    });

    it('test_google_fonts_plugin', () => {
        const addPluginSpy = vi.spyOn(eleventyConfig, 'addPlugin');
        eleventyConfig.addPlugin(eleventyGoogleFonts, {});
        expect(addPluginSpy).toHaveBeenCalledWith(eleventyGoogleFonts, expect.any(Object));
    });

    it('test_html_minification_production', () => {
        process.env.NODE_ENV = 'production';
        const mockHtmlContent = '<div>   <p>Test</p>   </div>';
        const mockMinifiedHtml = '<div><p>Test</p></div>';
        htmlmin.minify.mockReturnValue(mockMinifiedHtml);

        const result = eleventyConfig.addTransform('htmlmin', mockHtmlContent, 'output.html');
        expect(result).toBe(mockMinifiedHtml);
    });

    it('test_js_minification_error_handling', async () => {
        process.env.NODE_ENV = 'production';
        const mockJsCode = 'console.log("test");';
        terser.minify.mockRejectedValue(new Error('Terser error'));

        const result = await eleventyConfig.addFilter('jsmin', mockJsCode);
        expect(result).toBe(mockJsCode);
    });

    it('test_passthrough_copy_missing_files', () => {
        const addPassthroughCopySpy = vi.spyOn(eleventyConfig, 'addPassthroughCopy');
        eleventyConfig.addPassthroughCopy({'missing/path': 'output/path'});
        expect(addPassthroughCopySpy).toHaveBeenCalledWith({'missing/path': 'output/path'});
    });

    it('test_html_minification_non_production', () => {
        process.env.NODE_ENV = 'development';
        const mockHtmlContent = '<div>   <p>Test</p>   </div>';

        const result = eleventyConfig.addTransform('htmlmin', mockHtmlContent, 'output.html');
        expect(result).toBe(mockHtmlContent);
    });

    it('test_js_minification', async () => {
        process.env.NODE_ENV = 'production';
        const mockJsCode = 'console.log("test");';
        const mockMinifiedJs = 'console.log("test")';
        terser.minify.mockResolvedValue({code: mockMinifiedJs});

        const result = await eleventyConfig.addFilter('jsmin', mockJsCode);
        expect(result).toBe(mockMinifiedJs);
    });

    it('test_google_fonts_shortcode', () => {
        const mockEncodedText = encodeURIComponent("AÁÉÍÓÚÜÑaáéíóúüñBbCcDdEeFfGgHhIiJjKkLlMmNnÑñOoPpQqRrSsTtUuVvWwXxYyZz0123456789");
        const expectedHtml = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Monoton&family=Noto+Color+Emoji&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap&text=${mockEncodedText}">
    `;
        const result = eleventyConfig.addShortcode('googleFonts');
        expect(result).toBe(expectedHtml);
    });
});
