# frozen_string_literal: true
require 'uri'

module Banzai
  module Filter
    class InlineObservabilityFilter < ::Banzai::Filter::InlineEmbedsFilter
      def call
        return doc unless can_view_observability?

        super
      end

      # Placeholder element for the frontend to use as an
      # injection point for observability.
      def create_element(url)
        doc.document.create_element(
          'div',
          class: 'js-render-observability',
          'data-frame-url': url,
          'data-observability-url': Gitlab::Observability.observability_url
        )
      end

      # Search params for selecting observability links.
      def xpath_search
        "descendant-or-self::a[starts-with(@href, '#{Gitlab::Observability.observability_url}')]"
      end

      # Creates a new element based on the parameters
      # obtained from the target link
      def element_to_embed(node)
        url = node['href']
        uri = URI.parse(url)
        observability_uri = URI.parse(Gitlab::Observability.observability_url)

        if uri.scheme == observability_uri.scheme &&
            uri.port == observability_uri.port &&
            uri.host.casecmp?(observability_uri.host) &&
            uri.path.downcase.exclude?("auth/start")
          create_element(url)
        end
      end

      private

      def can_view_observability?
        Feature.enabled?(:observability_group_tab, group)
      end

      def group
        context[:group] || context[:project]&.group
      end
    end
  end
end
