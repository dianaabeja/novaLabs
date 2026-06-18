import { NgTemplateOutlet } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItemDto } from '../../../data-access/contracts/public-site.dto';

@Component({
  selector: 'app-site-navigation',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive],
  templateUrl: './site-navigation.html',
  styleUrl: './site-navigation.scss',
})
export class SiteNavigation {
  readonly items = input.required<NavigationItemDto[]>();
  protected readonly expanded = signal(false);

  protected toggle(): void {
    this.expanded.update((expanded) => !expanded);
  }

  protected close(): void {
    this.expanded.set(false);
  }

  protected isExternal(url: string): boolean {
    return /^https?:\/\//i.test(url);
  }
}
