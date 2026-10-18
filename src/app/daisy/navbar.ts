
import { Component, OnInit } from "@angular/core";
import { TablerIconComponent } from "@tabler/icons-angular";

@Component({
    selector: "qf-navbar",
    host: {
        class: "flex p-4 border-b border-base-200",
    },
    template: `
        <label class="swap swap-rotate">
            <input
                type="checkbox"
                [checked]="isNight"
                (change)="toggleTheme($event)"
            />
            <tabler-icon icon="moon-stars" class="swap-on" />
            <tabler-icon icon="sun" class="swap-off" />
        </label>
    `,
    imports: [TablerIconComponent],
})
export class Navbar implements OnInit {
    isNight = false;

    readonly DarkTheme = "business";
    readonly LightTheme = "corporate";

    ngOnInit(): void {
        const root = document.documentElement;
        const currentTheme = root.getAttribute("data-theme");

        this.isNight = currentTheme
            ? currentTheme === this.DarkTheme
            : false;

        // Zustand und tatsächliches Theme synchronisieren.
        this.applyTheme();
    }

    toggleTheme(event: Event): void {
        this.isNight = (event.target as HTMLInputElement).checked;
        this.applyTheme();
    }

    private applyTheme(): void {
        const theme = this.isNight
            ? this.DarkTheme
            : this.LightTheme;

        document.documentElement.setAttribute("data-theme", theme);
    }
}
