import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Track from '../components/modules/Track.vue';

const mockTrack = {
    name: 'Test Song',
    album: {
        images: [
            { url: 'https://via.placeholder.com/150' }
        ]
    },
    artists: [
        { name: 'Test Artist' }
    ]
};

describe('Track.vue', () => {
    it('renders track name and artist', () => {
        const wrapper = mount(Track, {
            props: { track: mockTrack }
        });
        expect(wrapper.text()).toContain('Test Song');
        expect(wrapper.text()).toContain('Test Artist');
    });

    it('renders album image', () => {
        const wrapper = mount(Track, {
            props: { track: mockTrack }
        });
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('src')).toBe('https://via.placeholder.com/150');
    });
});
